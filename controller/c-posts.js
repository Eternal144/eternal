
/**
 * 重置到文章页
 */
exports.getRedirectPosts = async ctx => {
    ctx.redirect('/posts')
}
exports.getHello = async ctx => {
    await ctx.render('hello', {
    })
}

