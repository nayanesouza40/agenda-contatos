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

// VALIDAÇÕES
const isValidNome = () => (document.getElementById('name').value != '')? true : alert('Digite um nome para o contato!')

const isValidFone = () => (document.getElementById('tel').value != '')? true : alert('Digite um número de telefone!')

const isValidEmail = () => ((document.getElementById('email').value.indexOf('@') != -1)&&(document.getElementById('email').value.indexOf('.') != -1)&&(document.getElementById('email').value != ''))? true : alert('Digite um e-mail válido!')

const isValidFields = () => {
    return (isValidFone() && isValidNome() && isValidEmail())
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
       const index = document.getElementById('name').dataset.index
       if(index == 'new') {
            createContato(contatoEntrada)
            updateLista()
            clearFields()
       } else {
            updateContato(index, contatoEntrada)
            clearFields()
            updateLista()
       }
       
    }
}

const createDiv = (contato, index) => {
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
        <p class="p-name"><span class="coracao">♥</span>&nbsp;${contato.nome}
        <button class="excluir" id="delete-${index}">x</button>
        </p>
        <p class="p-email">Email: ${contato.email}</p>
        <p class="p-tel">Telefone: ${contato.telefone}</p>
        <button class="editar" id="edit-${index}">Editar</button>
    `
    document.getElementById('agenda').appendChild(newDiv)
}

const updateLista = () => {
    const baseContatos = readContato()
    clearList()
    baseContatos.forEach(createDiv)
}

const preencherCampos = (contato) => {
    document.getElementById('name').value = contato.nome
    document.getElementById('tel').value = contato.telefone
    document.getElementById('email').value = contato.email
    document.getElementById('name').dataset.index = contato.index
}

const editDivContato = (index) => {
    const contato = readContato()[index]
    contato.index = index
    preencherCampos(contato)
}


const editDelete = (e) => {
    if(e.target.type=='submit'){
        const [action, index] = e.target.id.split('-')
        if (action == 'edit'){
            editDivContato(index)
        } else {
            const contato = readContato()[index]
            const response = confirm(`Deseja excluir o contato de ${contato.nome}?`)
            if (response) {
                deleteContato(index)
                updateLista()
        }}
    }
}

updateLista()

// EVENTOS
document.getElementById('salvar').addEventListener('click', saveContato)

document.getElementById('agenda').addEventListener('click', editDelete)