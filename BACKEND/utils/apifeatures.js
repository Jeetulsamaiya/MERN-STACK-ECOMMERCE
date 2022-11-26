class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i',
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
}

    filter() {
        const queryCopy = { ...this.queryString };
        // removing some fields for category
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(key => delete queryCopy[key]);
        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }


}

module.exports = ApiFeatures;