import Paging from "../utils/Paging"

class Search {
    static getSearchPaging(keywords: string) {
        return new Paging('/cloudsearch', { keywords })
    }
}

export default Search
