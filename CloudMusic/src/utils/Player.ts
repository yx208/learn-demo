
class AudioPlayer {

    // 播放器对象
    private audio: AudioContext
    // 已解码音频数据
    private audioBuffer: AudioBuffer
    // 音频节点
    private source: AudioBufferSourceNode
    private isPlay: boolean = false
    private src: string
    private locker: boolean

    constructor(src: string) {
        this.src = src

        this.audio = new AudioContext()
        this.loadAudioSource(this.src)
    }

    public changeAudio(src: string) {

        if (this.locker) return

        this.src = src
        this.loadAudioSource(this.src)
    }

    /**
     * 停止当前音乐播放，释放资源
     */
    public stop() {

        if (!this.isPlay) return

        this.audio.close().then(() => {
            this.source = null
            this.audioBuffer = null
            this.isPlay = false
            console.log('已释放资源')
        })
    }

    /**
     * 暂停播放
     */
    public pause() {

        if (!this.isPlay) return

        this.audio.suspend().then(() => {
            this.source.stop()
            this.source = null
            this.isPlay = false
        })
    }

    public play() {

        if (this.isPlay) return

        this.audio.resume().then(() => {
            this.createSourceNode()
            this.source.start(0, this.audio.currentTime)
            this.isPlay = true
        })
    }

    /**
     * 创建播放源节点
     * @private
     */
    private createSourceNode() {
        this.source = this.audio.createBufferSource()
        this.source.buffer = this.audioBuffer
        this.source.connect(this.audio.destination)
    }

    /**
     * 解码音乐
     * @param source
     * @private
     */
    private decodeAudio(source: ArrayBuffer) {
        this.audio.decodeAudioData(source).then((buffer) => {
            this.audioBuffer = buffer
            this.createSourceNode()
        }, (err) => {
            console.log('DecodeAudio Error', err)
        })
    }

    /**
     * 下载音乐
     * @param url
     * @private
     */
    private loadAudioSource(url: string) {

        this.lock()

        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = (event) => {
            this.unlock()
            this.decodeAudio(xhr.response)
        }
        xhr.send()
    }

    private lock() {
        this.locker = true
    }

    private unlock() {
        this.locker = false
    }

}

export default AudioPlayer
