const buttons = document.querySelectorAll('.left-side > *')
const arrayButtons = Array.from(buttons)
const loadSite = document.querySelector('.loadSite')
const body = document.querySelector('body')
const all = document.querySelector('*')
const loadError = document.querySelector('.loadError')
const title = document.querySelector('.title')
const loadTodosStatus = document.querySelector('.loadTodosStatus')

const api = fetch(`https://jsonplaceholder.typicode.com/users`)

const link = `https://jsonplaceholder.typicode.com/users/`

const load = () => {
  loadSite.style.display = ''
  loadError.style.display = 'none'
}

const loadCancel = () => {
  loadSite.style.display = 'none'
}

const loadErrorF = () => {
  loadError.style.display = 'flex'
}


const userStatus = () => {
  loadTodosStatus.style.display = 'block'
}

const userStatusCancel = () => {
  loadTodosStatus.style.display = 'none'
}

const userStatusError = () => {
  loadTodosStatus.style.display = 'block'
  loadTodosStatus.style.color = 'red'
  loadTodosStatus.textContent = 'ERROR'

}

const loading1 = async () => {
  try {
    load()
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    loadCancel()
    const users = await response.json()
    let result = []
    console.log(users)

    const loading = async () => {
      const loadUsers = await (await fetch(`${link}`)).json()
      for (let i = 0; i < loadUsers.length; i++) {
        result.push(loadUsers[i].name)
        buttons[i].textContent = `${result[i]}`
      }
    }

    loading()

    const box = document.createElement('div')
    box.className = 'box'
    const rightSide = document.querySelector('.right-side')
    rightSide.append(box)

    users.forEach(async (a) => {
      buttons[a.id - 1].addEventListener('click', async () => {
        box.innerHTML = ''
        userStatus()
        setTimeout(() => {
          userStatusCancel()
          title.textContent = `Список дел ${a.name}`
          fetch(`${link}${a.id}/todos`)
            .then(z => z.json())
            .then(y => {
              y.forEach(async (todos) => {
                const li = document.createElement('li')
                li.textContent = todos.title
                if (todos.completed === false) {
                  li.style.textDecoration = 'line-through'
                }
                box.append(li)
              })
            })
            .catch(error => {
              console.error(error)
              userStatusError()
            })
        }, await fetch(`${link}${a.id}/todos`))
      })
    })
  } catch (error) {
    console.error(error)
    loadErrorF()
    userStatusError()
  }
}

loading1()