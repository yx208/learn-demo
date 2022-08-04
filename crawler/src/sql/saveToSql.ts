// import BookModel from "../model/Book"
import PublisherModel from "../model/Publisher"
import BookModel from "../model/Book"
import { Book, Publisher } from '../core/book'
import config from "../config/config"
import {DataTypes} from "sequelize";

// 分隔符
const { separator } = config

async function saveBook(book: Book) {

    const res = await BookModel.findOne({ where: { id: book.id } })

    if (res) {
        console.log(book.id, ' 存在')
        return
    }

    try {
        await BookModel.create({
            id: book.id,
            stock: book.stock,
            previewImages: book.previewImages.join(separator),
            title: book.title,
            subTitle: book.subTitle,
            author: book.author,
            pubDate: book.pubDate,
            star: book.star,
            price: book.price,

            ebook: JSON.stringify(book.ebook),
            publisher: JSON.stringify(book.publisher),
            detailDescribe: JSON.stringify(book.detailDescribe),

            feature: book.feature && book.feature.join(separator),
            relateGoods: book.relateGoods && book.relateGoods.join(separator),
            abstract: book.abstract && book.abstract.join(separator),
            contentIntroduction: book.contentIntroduction && book.contentIntroduction.join(separator),
            authorIntroduction: book.authorIntroduction && book.authorIntroduction.join(separator),
            toc: book.toc && book.toc.join(separator),
            mediaFeedback: book.mediaFeedback && book.mediaFeedback.join(separator),
            preface: book.preface && book.preface.join(separator),
            extract: book.extract && book.extract.join(separator)
        })
    } catch (err) {
        console.log('Create Book Error: ', err)
    }
}

async function savePublisher(publisher: Publisher) {

    const res = await PublisherModel.findOne({ where: { id: publisher.id } })
    if (res) return

    try {
         await PublisherModel.create({
            id: publisher.id,
            name: publisher.name,
            logo: publisher.logo,
            service: publisher.service.join(separator)
        })
    } catch (err) {
        console.log('Create Publisher Error: ', err)
    }
}

export {
    savePublisher,
    saveBook
}
