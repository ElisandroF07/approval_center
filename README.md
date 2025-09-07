
# Approval Center

Projeto de Central de Aprovações utilizando Nuxt 3 e Nuxt UI.

## Link do repositório

https://github.com/ElisandroF07/approval_center

## Instruções para rodar o projeto

1. Clone o repositório:
	```bash
	git clone https://github.com/ElisandroF07/approval_center.git
	```
2. Instale as dependências:
	```bash
	npm install
	```
3. Inicie o projeto:
	```bash
	npm run dev
	```

## Decisões técnicas e pontos relevantes

- Gerenciamento de estado centralizado com Pinia (`useRequestsStore`), facilitando o controle das requisições e seleção de linhas.
- Paginação na tabela para maior controle sobre os dados exibidos.
- Componentização: os elementos visuais principais (tabela, sidebar, botões) foram criados como componentes Vue reutilizáveis.
- O status das requisições é persistido no `localStorage` e as stores pinia são atualizadas automaticamente para garantir que as aprovações não se percam ao recarregar a página.
- O layout foi pensado para ser responsivo e manter a barra de rolagem apenas na área da tabela, mantendo o cabeçalho e filtros fixos.
- Design simples e intuitivo, visando proporcionar ao utilizador, uma experiência cômoda e intuitiva.
- Lógica de atualização em massa simples e funcional, atendendo ao solicitado no enunciado.

```

Veja a [documentação de deploy](https://nuxt.com/docs/getting-started/deployment) para mais informações.
