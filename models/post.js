import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    image: {
        type: String,
        required: [true, "Image is required."],
    },
    ai: {
        type: String,
        required: [true, "AI used for image required."],
    },
    filename : {
        type: String,
        required: [true, "Filename is required."],
    },
})

PostSchema.set('timestamps', true);

const Post = models.Post || model('Post', PostSchema);

export default Post;