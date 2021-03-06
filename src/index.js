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

    likeImage(imageContent.like_count)
    createComment()
  }

  function likeImage(like_count) {
    const likeButton = document.getElementById('like_button')

    likeButton.addEventListener('click', e => {
      like_count = like_count + 1

    let numberOfLikes = document.getElementById('likes')

    numberOfLikes.innerText = like_count

    updateLikes(like_count)
    })
  }

  function updateLikes(like_count) {
    const data = {
      image_id: 82
    }

    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
    }

    function createComment() {
      const commentForm = document.getElementById('comment_form')
      const commentInput = document.getElementById('comment_input')

      commentForm.addEventListener('submit', event => {
          event.preventDefault()

          const newComment = document.createElement('li')

          newComment.innerHTML = commentInput.value

          const commentList = document.getElementById('comments')

          commentInput.value = ''

          const data = {
            image_id: 82,
            content: newComment.innerText
          }

          fetch('https://randopic.herokuapp.com/comments', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(r => r.json())
          .then(persistedComment => {

            const deleteButton = document.createElement('button')

            deleteButton.id = persistedComment.id
            deleteButton.innerHTML = 'Delete'

            commentList.append(newComment)
            newComment.append(deleteButton)

            deleteButton.addEventListener('click', event => {
              newComment.parentNode.removeChild(newComment)
              fetch(`https://randopic.herokuapp.com/comments/${persistedComment.id}`, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
              .then(r => r.json())
              .then (res => console.log(res))
            })
          })
      })
    }





})
