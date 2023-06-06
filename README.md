# DESAFIO01-NOVATRILHA-NODEJS
DESAFIO 01 DA NOVA TRILHA NODE.JS

## Sobre o desafio da Rocketseat

Nesse desafio foi construida uma API para realizar o CRUD de *tasks* (tarefas).

A API possui as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- Importação de tasks em massa por um arquivo CSV


Estrutura (propriedades) que uma task tem:

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial é `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.
