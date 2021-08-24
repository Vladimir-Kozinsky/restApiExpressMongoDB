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
        try {
            const posts = await Post.find();
            return res.json(posts);
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
    async auth(req, res) {
        try {
            const { email, password, rememberMe } = req.body
            const auth = await PostAuth.create({ email, password, rememberMe })
            console.log(req.body)
            res.json(auth)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async isAuth(req, res) {
        try {
            const { email } = req.params
            
            const auth = await PostAuth.findOne(email);
            if (!auth) {
                res.status(400).json({ message: "Email not found" })
            }
            console.log(req.body)
            res.json(auth)
        } catch (e) {
            res.status(400).json({ message: "Id is required" })
        }
    }
}

export default new PostController();