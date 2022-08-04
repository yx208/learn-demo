import Http from '../api/http'
import { verseBaseURL } from '../config'

class VerseModel extends Http {
    constructor() {
        super(verseBaseURL)
    }

    getVerse() : Promise<HitokotoResponse> {
        return this.get<HitokotoResponse>('/', {
            params: {
                c: 'i'
            }
        })
    }
}

export default VerseModel
