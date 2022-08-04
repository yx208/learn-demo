![1](https://192.168.47.104:8443/images/separating/1.png)

# [译] 在 Vue 组件中分离 UI 和业务逻辑



> 转载自掘金：江米小枣tonylua
>
> 原文链接：[掘金文章](https://juejin.cn/post/6868997861040734221)



我在大型 Vue 和 React 项目中观察到的常见事件之一就是，随着时间的增加，UI 逻辑和业务逻辑纠缠不清、相互破坏。让我们来看一个这种情况的例子，以及如何分离这些关注点。

糅杂的关注点也意味着应用贫弱的测试覆盖率 —— 单元测试总会迫使你将业务逻辑和 UI 逻辑分开，不若如此的话测试就难以进行。即便不考虑测试，因为 Vue 和 React 是用来构建用户界面的而非封装应用逻辑的，所以保持二者分离也很有必要。

在本文中，我将通过重构一个由 Milad Dehghan 编写的密码强度组件来探讨分离业务逻辑和 UI 逻辑。该组件的源码可以在此找到：[Github 地址](https://github.com/miladd3/vue-simple-password-meter) 。

![2](https://192.168.47.104:8443/images/separating/2.png)

该组件如何工作的基本概览如下：

```html
<template>
	<div class="po-password-strength-bar" :class="passwordClass"></div>
</template>

<script>
export default {
    props: {
        password: {
            type: String,
            required: true
        }
    },
    computed: {
        passwordStrength() {
            if (this.password) {
                return this.checkPassword(this.password)
            }
        },
        passwordClass() {
            return [
                { scored: this.passwordStrength && this.password },
                {
                    risky: this.passwordStrength === 0,
                    // ...
                    secure: this.passwordStrength === 4
                }
            ]
        }
    },
    methods: {
        checkPassword(pass) {
            // 基于字符、长度、数字的逻辑
            // 返回一个 0 - 4 之间的数字
            // 0 最弱， 4 最强
        }
    }
}
</script>

<style>
    
.po-password-strength-bar.risky {
    background-color: #f95e68;
}

/* ... 其他样式 */

.po-password-strength-bar.secure {
    background-color: #35cc62;
}
</style>

```

计算值 `passwordClass` 是一个 UI 关注点 —— 依赖于来自计算属性 `passwordStrength` 的数字返回值，返回不同的 `class`，从而相关的样式被采用。 假若 JavaScript 有私有方法特性的话，`passwordStrength` 无疑算作一个 —— 它基本上是一个连接 UI 和包含在 `checkPassword` 中的主要业务逻辑的工具函数。

`checkPassword` 封装了所有业务逻辑。其定义了数个正则表达式并将它们应用到 `password` 属性。取决于匹配`password` 的正则表达式的数量，计算出一个介于 0 到 4 的数字。如果我们决定让逻辑更健壮一点，比方说像 `zxcvbn` 那样，只消在这个方法中作出改变即可。

## 待改进和待重构的

该组件当前运行良好，也没有明显的问题。但如果我想在产品中开始使用这个组件的话，除了改进为更健壮的估测算法外，还有一些能给我前进信心的改变。我将研究的改进有：

- 测试！
- 分离 UI 和业务逻辑

分离业务逻辑会使其非常易于达成我的一个其它目标，就是迁移到更安全的密码强度估测算法。

## 编写回归测试

在着手进行任何重构之前，我总是会编写一些基础的回归测试。我想确保我的改变不会破坏既有的功能。我将从编写围绕着两个极端情况的测试开始 -- 一个不安全的密码（0 分，也就是“risky 危险的”）和一个安全的密码（4 分）。

```javascript
import { shallowMount } from '@vue/test-utils'
import SimplePassword from '@/SimplePassword.vue'

const riskyPassword = 'abcdef'
const securePassword = 'abc123ABC?!'

test('用 SimplePassword 处理一个危险的简单密码', () => {
    const wrapper = shallowMount(SimplePassword, {
        propsData: {
            password: riskyPassword
        }
    })
    expect(wrapper.classes()).toContain('risky')
})

test('用 SimplePassword 处理一个安全的简单密码', () => {
    const wrapper = shallowMount(SimplePassword, {
        propsData: {
            password: securePassword
        }
    })
    expect(wrapper.classes()).toContain('secure')
})
```

## 定义 `checkPassword` 接口

我想让 `SimplePassword` 有最小化的公开接口。特别的是，我并不想让 `SimplePassword` 了解类似打分系统的东西 -- 只要知道 `risky（危险的）`、`guessable（可推测的）`、`secure（安全的）` 等等结果就够了。因为我将对此次重构采用 TDD，所以我将首先编写测试。为了简洁起见我只处理了两种极端情况，在真实系统中应该测试所有情况。

```javascript
describe('checkPassword', () => {
    it('是危险的密码', () => {
        const actual = checkPassword(riskyPassword)
        expect(actual).toBe('risky')
    })

    it('是安全的密码', () => {
        const actual = checkPassword(securePassword)
        expect(actual).toBe('secure')
    })
})
```

这将毫无悬念地失败，测试根本访问不到 `checkPassword` 方法，所以会报错 `ReferenceError: checkPassword is not defined`。我将在 `SimplePassword.vue` 的同级目录创建一个 `logic.js` 文件并将 `checkPassword` 方法从 `SimplePassword.vue` 移至其中。

```javascript
export function checkPassword(pass) {
    // ... 一组变量声明 ...

    if (pass.length > 4) {
        if ((hasLowerCase || hasUpperCase) && hasNumber) {
            numCharMix = 1;
        }

        if (hasUpperCase && hasLowerCase) {
            caseMix = 1;
        }

        if ((hasLowerCase || hasUpperCase || hasNumber) && hasSpecialChar) {
            specialChar = 1;
        }

        if (pass.length > 8) {
            length = 1;
        }

        if (pass.length > 12 && !hasRepeatChars) {
            length = 2;
        }

        if (pass.length > 25 && !hasRepeatChars) {
            length = 3;
        }

        score = length + specialChar + caseMix + numCharMix;

        if (score > 4) {
            score = 4;
        }
    }

    return score;
}
```

现在所有事情仍会失败，因为 `SimplePassword.vue` 尚未与新的 `checkPassword` 有何瓜葛。将其更新为：

```html
<script>
import { checkPassword } from './logic'

export default {
    name: "password-meter",
    props: {
        password: String
    },
    computed: {
        passwordStrength() {
            if (this.password) return checkPassword(this.password);
            return null;
        },
        passwordClass() {
            // ... 此处省略若干行
        }
    }
}
</script>
```

目前为止我很得意这次重构。我对 `SimplePassword.vue` 作出的唯一改变就是：

```javascript
// import this
import { checkPassword } from './logic'

passwordStrength() {
    // 将 `this.checkPassword` 改为 `checkPassword`
    if (this.password) return checkPassword(this.password);
    return null;
}
```

虽然看起来没什么，但这已经是一个巨大的胜利。`checkPassword` 更易于测试了。同时，将 `this.checkPassword` 改为 `checkPassword` 反映出了业务逻辑和 UI 逻辑之间的解耦。`this` 引用了 Vue 实例或组件，所以：

> `this` 上附加的任何事情 **都不应该和 UI 产生关联**

`checkPassword` 同时也是一个纯函数 —— 其中没有引用到 `this` 的全局变量，这意味着它有确定性的、完全基于其输入的输出。这非常有益于测试，而且一般都会让人感觉很棒。

## 更新 `checkPassword` 接口

将测试更新为 `import { checkPassword } from '@/logic'` 会带来如下报错：

```
Expected: "risky"
Received: 0

Expected: "secure"
Received: 4
```

那么继续更新 `checkPassword` 以通过测试。最小化的改变是将 `passwordClass` 从一个 `computed` 移至 `logic.js`。

```javascript
function passwordClass(passwordStrength) {
    if (passwordStrength === 0) {
        return 'risky'
    }

    // ... 此处省略若干行 ...

    if (passwordStrength === 4) {
        return 'secure'
    }
}
```

注意我们并没有将 `passwordClass` 函数直接 `export` 了之 -- 这反映了我在开头时的阐述，即 `passwordClass` 是一个“私有函数”。

现在我们可以更新 `checkPassword` 中的 `return` 语句以使用新的 `passwordClass` 方法，从而通过测试了：

```javascript
export function checkPassword(pass) {
    // ... 
    return passwordClass(score);
}
```

现在 `checkPassword` 相关的测试用例通过了。但组件测试仍是失败的。来修复它！

```html
<script>
    import { checkPassword } from './logic'

    export default {
        // ...
        computed: {
            passwordClass() {
                if (this.password) {
                    const className = checkPassword(this.password);

                    return {
                        [className]: true,
                        scored: true
                    }
                }
            }
        }
    };
</script>
```

所有测试都能通过了。

我们不再需要 `passwordStrength` 和 `passwordClass`，以及一堆 `if` 语句了，因为 `checkPassword` 定义了清晰的接口并封装了所有的业务逻辑。我可喜欢这个了 -- `checkPassword` 现在非常易于测试，而 `SimplePassword` 组件的 `script` 标签中的代码只和 UI 直接相关。同时也很容易就能切换密码强度算法 -- 因为我们有了单元测试，如果有什么被破坏了我将会立即得知。

重构也很好的改善了我们的测试 -- 我们有两个使用 `render` 测试用例只对 CSS 类作出断言，还有一些测试用例只围绕业务逻辑而不触及任何 `SimplePassword` 的 UI 关注点。

## 总结

我还有一些其它想要改进的样式，现在可以放心的进行了，因为已经有了相当好的测试覆盖率。分离业务逻辑和 UI 逻辑使 `SimplePassword` 更易理解，也使我们提高了测试覆盖率。重构也隐藏了实现细节，模拟出了 JavaScript 中并不存在的 `private` 特性。

分离业务逻辑和 UI 逻辑很有价值；首当其冲的就是可测试性和可阅读性，缺点则很小。尽管它需要更多的预先考虑，你得到的却是更好的设计和更易维护的代码。

