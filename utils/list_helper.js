const dummy = (blogs) => {
    if(blogs) {
        return 1
    }
  }

const totalLikes = (blogs) => {
    const reducer = (total, blog) => {
        return total + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
} 
const favoriteBlog =(blogs) => {
    const reducer = (maxLikesBlog, blog) =>{
        return  blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog
    }
    const favblog = blogs.reduce(reducer, blogs[0])

    return {
        title: favblog.title,
        author: favblog.author,
        likes: favblog.likes,
    }
}

const  mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    //countBlog object to store no. of blogs by each author
    const blogCountByAuthor = blogs.reduce((countBlog, blog) => {         //countBlog is accumulator of reduce function, blog is taking blogs[] one by one
        const author = blog.author
        countBlog[author] = (countBlog[author] || 0) + 1
        return countBlog
    }, {})
    
    // console.log(blogCountByAuthor)

    //find the author with most blogs
    let topAuthor = ''
    let maxBlogs = 0

    for (const author in blogCountByAuthor) {
        if (blogCountByAuthor[author] > maxBlogs) {
          topAuthor = author;
          maxBlogs = blogCountByAuthor[author];
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    }
}

//optimized algo for counting most blogs by author(moore's voting algo)
//also work on most likes by author
const mostBlogs2 = (blogs) => {
    if(blogs.count === 0){
        return null
    }

    let count = 0
    let topauthor = ''
    let n = blogs.length

    for(let i=0; i<n; i++) {
        // console.log(blog)
        const author = blogs[i].author
        if(count ==0) {
            count = 1
            topauthor = author
        }
        else if(author == topauthor){
            count ++
        }
        else{
            count --
        }
    }

    count =0
    for(let i=0; i<n; i++){
        if(blogs[i].author === topauthor){
            count ++
        }
    }
    return {
        author: topauthor,
        blogs: count
    }

}

const  mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    //countLikes object to store no. of likes by each author
    const likesCountByAuthor = blogs.reduce((countLikes, blog) => {
        const author = blog.author
        countLikes[author] = (countLikes[author] || 0) + blog.likes
        return countLikes
    }, {})
    
    console.log(likesCountByAuthor)

    //find the author with most blogs
    let topAuthor = ''
    let maxLikes = 0

    for (const author in likesCountByAuthor) {
        if (likesCountByAuthor[author] > maxLikes) {
          topAuthor = author;
          maxLikes = likesCountByAuthor[author];
        }
    }

    return {
        author: topAuthor,
        likes: maxLikes
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostBlogs2,
    mostLikes
}