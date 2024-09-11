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
            choices: [...metas]
        })

        if (respostas.length == 0) {
            console.log("Nenhuma meta selecionada!")
            return
        }

        respostas.forEach((m) => {
            m.checked = false
        })

        respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
                return m.value == resposta
            })
            meta.checked = true
        })
        console.log("Meta(s) marcadas como concluídas(s)")
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
                console.log("listando")
                break
            case "sair":
                return 
        }
    }
}

start()