const mongoose = require("mongoose");
export  class MongooseHelper {
    Document: any;
    Aggregate: Array<any>;
    Page: number;
    PageSize: number;
    constructor(document : any){
        this.Document = document;
        this.Aggregate = [];
    }
    async byID(id){
        var data = await this.Document.findOne({_id:  mongoose.Types.ObjectId(id)});
        return  data;
    }
    async all(){
        var data = await this.Document.aggregate([
            {
                $match: {}
            }
        ],{"allowDiskUse" : true})
        return  data;
    }
    query(query){
        if(query==null || query == {}){
            query = { $match: {}}
        }
        this.Aggregate.push(query)
        return this;
    }
    sort(fieldName = "createdAt",fieldType = 1){
        this.Aggregate = [...this.Aggregate, { $sort:{ [fieldName]: fieldType} }]
        return this;
    }
    project(project){
        this.Aggregate = [...this.Aggregate, { $project: project }]
        return this;
    }
    lookup(field, fromModel,fromModelField="_id",){
        this.Aggregate = [...this.Aggregate, {
            $lookup: {from: fromModel,localField: field,foreignField: fromModelField, as: field }
        }]
        return this;
    }
    paging (page, pageSize){
        page = page || 1;
        pageSize = pageSize || 10;
        page = page-1;
        this.Page = page;
        this.PageSize = pageSize;
        var pagion = [
            {
                $facet: {
                    _total: [{ $count: 'rows' }],
                    data: [
                        {
                            $skip: pageSize * page
                        },
                        {
                            $limit: pageSize,
                        },
                        // {
                        //     $unset: "user",
                        // },
                    ]
                }
            },
            {
                $set: {
                    total: {
                        "pages": {
                            $round: [
                                {
                                    $divide: [
                                        { $arrayElemAt: ['$_total.rows', 0] }, pageSize
                                    ]
                                },
                                0
                            ]
                        },
                        "rows": {
                            $arrayElemAt: ['$_total.rows', 0]
                        }
                    }
                }
            },
            {
                $unset: "_total"
            },
        ];
        this.Aggregate.push(...pagion);
        return this;
    }
    async excute() {
        var data = await this.Document.aggregate(this.Aggregate,{"allowDiskUse" : true}).exec();
        if(typeof data[0].total != "undefined")
        {
            if(data[0].total.pages%1 != 0) {
                data[0].total.pages = Math.round(data[0].total.pages);
            }
            data[0].total.pages = data[0].total.pages+1;
            data[0].total.current =  this.Page+1;
            data[0].total.pageSize = this.PageSize; 
        }
        return data[0];
    }
}