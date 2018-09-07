document.addEventListener('DOMContentLoaded', function() {

  const imageId = 82 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/${imageId}`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.getElementById('image_content')

  fetch(imageURL)
  .then(r => r.json())
  .then(imageR => showImageContent(imageR))

  function showImageContent(imageContent) {
    console.log(imageContent)
    const myImage = document.getElementById('image')
    myImage.src = imageContent.url

    const myName = document.getElementById('name')
    myName.innerText = imageContent.name

    const myLikes = document.getElementById('likes')
    myLikes.innerText = imageContent.like_count

    const commentList = document.getElementById('comments')

    imageContent.comments.forEach(comment => {
      const nextComment = document.createElement('li')
      nextComment.innerText = comment.content
      commentList.append(nextComment)
    })


  }




})
