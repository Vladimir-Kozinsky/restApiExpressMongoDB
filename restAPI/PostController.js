import Post from "./Post.js";
import PostAuth from "./PostAuth.js";

class PostController {
    async create(req, res) {
        try {
            const { author, title, content, picture } = req.body
            const post = await Post.create({ author, title, content, picture })
            console.log(req.body)
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        try {

            // res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            const posts = await Post.find();
            return res.json({
                ResultCode: 0,
                data: posts
            });
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: "Id is required" })
            }
            const post = await Post.findById(id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        const post = req.body
        if (!post._id) {
            res.status(400).json({ message: "Id is required" })
        }
        const updatePost = await Post.findByIdAndUpdate(post._id, post, { new: true })
        return res.json(updatePost);
    }
    async delete(req, res) {
        const { id } = req.params
        if (!id) {
            res.status(400).json({ message: "Id is required" })
        }
        const deletePost = await Post.findByIdAndDelete(id)
        return res.json(deletePost);
    }
    async isAuth(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        try {
            // res.header('Access-Control-Allow-Origin', '*')
            
            const auth = await PostAuth.findOne({ "email": req.email })
            console.log(req.body)
            if (!auth) {
                res.status(400).json({
                    ResultCode: 1,
                    message: "User didn't find"
                })
            }
            const result = {
                ResultCode: 0,
                messages: [],
                data: {
                    userId: auth._id
                }
            }
            if (auth.password != req.body.password) {
                res.status(400).json({
                    ResultCode: 1,
                    message: "Password is wrong"
                })
            }
            res.json(result)
        } catch (e) {
            res.status(500).json({
                ResultCode: 1,
                message: e
            })
        }
    }
}

export default new PostController();