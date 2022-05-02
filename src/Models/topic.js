const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

const schema = mongoose.Schema;



let CommentsSchema = schema({
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: schema.ObjectId, ref: 'User'},
});

let comments = mongoose.model('Comment', CommentsSchema)

let TopicSchema = schema({
    title: String,
    user: {type: schema.ObjectId, ref: 'User'},
    categoria_id: { required: true, type: schema.Types.ObjectId, ref: 'Categoria' },
    content: String,
    imagen: String,
    coments: [CommentsSchema],
    slug: String,
    theme: String,
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
});

//cargar paginacion
TopicSchema.plugin(paginate);
module.exports = mongoose.model('Topic', TopicSchema);