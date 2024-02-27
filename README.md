# Modos extensão do chrome
Uma extensão do crhome para te ajudar a melhorar sua produtividade.

- Você vai criar grupos de perfis onde você pode decidir que tipo de site você vai acessar.

### Funcionalidades da extensão

- Criar perfis, por exemplo: Estudo, Trabalho, Lazer e Livre
- Para cada perfil, vamos colocar os sites permitidos (whitelist)
- Quando acessarmos outros sites que não estão na whitelist, ele deve mostrar uma mensagem de bloqueio

### Extras

- Na mensagem de bloqueio, podemos mostrar em qual perfil aquele site se encaixa e perguntar se o user quer trocar pra aquele perfil
- No fim do dia, podemos ter estatísticas de tempo que mostrem quanto tempo o usuário passou em cada perfil
- Podemos mostrar essa divisão semanalmente, mensalmente, anualmente ou durante um período escolhido pelo usuário


#### Funcionalidades que extensão precisa conseguir fazer

- Reconhecer qual site estou acessando
- Inserir css na página atual se diferir do site do perfil
- Aceitar lista de sites do usuário e comparar

### Arquivos

- Content.js serve pras coisas que vão rodar nas pages enquanto a extensão tá ativa, ela pode modificar o DOM da página, aparência, comportamento e tal, além de conseguir comunicar com outras partes da extensão
- Background.js tem acesso a APIs que não estão disponíveis no content como storage e tabs, elas são tipicamente usadas para performar tarefas de longo prazo e coordenar comunicação entre partes diferentes da extensão
- Options Serve pra ter uma pagina extra onde o user interage
- Popup é similar com a options

### TODO

- English README
- Commits for each new feature

### Modos chrome extension

A chrome extension that helps you to improve your productivity

- You will create groups of profiles where you can decide what kind of website you're going to access.

### Extension features

- Create profiles, for example: Study, Work, Fun and Free.
- For each profile, you'll input whitelisted websites.
- When you try to access websites outside the white list, you'll receive a block message.

### Bonus


