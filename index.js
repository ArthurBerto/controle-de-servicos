const frm = document.querySelector("form")
const resp = document.querySelector("#outResp")
const servicosPen = document.querySelector("#outServicosPen")

frm.addEventListener("submit", (e) => {
    e.preventDefault()

    const servico = frm.inServico.value

    // Atribui o localStorage para a variável lista
    let lista = localStorage.getItem("listaServicos")

    // Se a key não existir dentro do localStorage, ela é criada
    if (!lista) {
        localStorage.setItem("listaServicos", servico)
    } else { // Se existir, o valor da key é adicionado com um ";" no fim
        lista += `;${servico}`
        localStorage.setItem("listaServicos", lista)
    }

    // Reset no form após adicionar na lista
    frm.reset()
    frm.inServico.focus()

    // Executa a função para mostrar quais atividades ainda estão pendentes
    mostrarServicosPendentes()
})

const mostrarServicosPendentes = () => {
    // Puxa a key do localStorage
    let servicos = localStorage.getItem("listaServicos")
    // Se a key não existir, retorna 0
    if (!servicos) {
        return servicosPen.innerText = `0`
    }

    // Divide a String do LocalStorage em um array
    let partes = servicos.split(";")
    // Retorna o tamanho do array
    return servicosPen.innerText = `${partes.length}`
}

// Sempre que a página for recarregada, vai rodar a função mostrarServicosPendentes
window.addEventListener("load", mostrarServicosPendentes)

const executarServico = () => {
    // Puxa a key do localStorage
    let servicos = localStorage.getItem("listaServicos")
    // Se a key não existir, retorna um alerta
    if(!servicos) {
        alert("Não há serviços pendentes!")
    }

    // Divide a String do LocalStorage em um array
    let partes = servicos.split(";")
    resp.innerText = `${partes[0]}`

    // Tira o primeiro elemento do array
    partes.shift()

    let lista = ""

    // Laço de repetição para criar uma nova String com os serviços pedentes
    for (let i = 0; i < partes.length; i++) {
        if (partes.length - 1 == i) {
            lista += partes[i]
        } else {
            lista += partes[i] + ";"
        }
    }

    // Exclui o localStorage
    localStorage.removeItem("listaServicos")

    // Cria uma nova key mo localStorage
    localStorage.setItem("listaServicos", lista)
    mostrarServicosPendentes()
}

frm.btExecutar.addEventListener("click", executarServico)