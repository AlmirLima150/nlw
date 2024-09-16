const { select, input, checkbox } = require("@inquirer/prompts")
const start = async () => {
    
    let meta ={
        value: "Ler um capitulo por dia",
        checked: false
    }

    let metas = [meta]

    const cadastarMeta = async() => {
        const meta = await input({ message: "Digite a meta:"})

        if (meta.length == 0 ) {
            console.log("A meta não pode ser vazia")
            return
        }
        metas.push({ value: meta, checked: false })
    }

    const listarMetas = async() => {
        const respostas = await checkbox({
            message:"Use as setas para movimentar, espaço para marcar e entar para confirmar",
            choices: [...metas],
            instructions: false,
        })

        metas.forEach((m) => {
            m.checked = false
        })

        if (respostas.length == 0) {
            console.log("Nenhuma meta selecionada!")
            return
        }

        respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
                return m.value == resposta
            })
            meta.checked = true
        })
        console.log("Meta(s) marcadas como concluídas(s)")
        }

    const metasRealizadas = async() => {
        const realizadas = metas.filter((meta) => {
            return meta.checked
        })

        if(realizadas.length == 0) {
            console.log("Não existem metas realizadas!")
            return
        }

        await select({
            message: `Metas Realizadas: ${realizadas.length}`,
            choices: [...realizadas]
        })
    } 

    const metasAbertas = async() => {
        const abertas = metas.filter((meta) => {
            return !meta.checked
        })

        if(abertas.length == 0) {
            console.log("Não existem metas em abertas!")
            return
        }

        await select({
            message: `Metas Abertas: ${abertas.length}`,
            choices: [...abertas]
        })
    }

    const removerMetas = async() => {
        const metasDesmarcadas = metas.map((meta) => {
            return { velue: meta.value, checked: false }
        })
        
        const itemsADeletar = await checkbox({
            message:"Use as setas para movimentar, espaço para marcar e entar para confirmar",
            choices: [...metasDesmarcadas],
            instructions: false,
        })

        if(itemsADeletar.length == 0){
            console.log("Nenhum item selecionado!")
            return
        }

        itemsADeletar.forEach((item) => {
            metas.filter((meta) => {
                return meta.velue != item
            })
        })
        console.log("Meta(s) deletada(s) com sucesso!")
    }

    while (true){
        const opcao =  await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Remover abertas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch (opcao){
            case "cadastrar":
                await cadastarMeta()
                console.log(metas)
                break 
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "remover":
                await removerMetas()
                break
            case "sair":
                return 
        }
    }
}

start()