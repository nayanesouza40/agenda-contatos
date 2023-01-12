// CRUD - create read update delete

const getLocalStorage = () => JSON.parse(localStorage.getItem('contato')) ?? []
const setLocalStorage = (baseContatos) => localStorage.setItem('contato', JSON.stringify(baseContatos))

// CRUD
const createContato = (contato) => {
    const baseContatos = getLocalStorage()
    baseContatos.push(contato)
    setLocalStorage(baseContatos)
}

const readContato = () => getLocalStorage()

const updateContato = (index, contato) => {
    const baseContatos = readContato()
    baseContatos[index] = contato
    setLocalStorage(baseContatos)
}

const deleteContato = (index) => {
    const baseContatos = readContato()
    baseContatos.splice(index,1)
    setLocalStorage(baseContatos)
} 

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    document.getElementById('name').value = ''
    document.getElementById('email').value = ''
    document.getElementById('tel').value = ''
}

const clearList = () => {
    const listaContatos = document.querySelectorAll('#agenda>div')
    listaContatos.forEach(newDiv => newDiv.parentNode.removeChild(newDiv))
}

// INTERAÇÕES
const saveContato = () => {
    if(isValidFields()){
        const contatoEntrada = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('tel').value
        }
        createContato(contatoEntrada)
        updateLista()
        clearFields()
    }
}

const createDiv = (contato) => {
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
        <p class="p-name">Nome: ${contato.nome}</p>
        <p class="p-email">Email: ${contato.email}</p>
        <p class="p-tel">Telefone: ${contato.telefone}</p>
        <button class="editar-contato">Editar</button>
        <button class="excluir-contato">Excluir</button>
    `
    document.getElementById('agenda').appendChild(newDiv)
}

const updateLista = () => {
    const baseContatos = readContato()
    clearList()
    baseContatos.forEach(createDiv)
}

updateLista()

// EVENTOS
document.getElementById('salvar').addEventListener('click', saveContato)

