
# Hub da Saúde 



## Resumo do Projeto 

O acesso a estudos clínicos no Brasil é dificultado pela fragmentação das informações e pela ausência de uma plataforma centralizada que conecte pacientes a centros de pesquisa. Isso torna o processo de recrutamento lento e ineficiente, impactando negativamente o avanço da ciência e o acesso a tratamentos inovadores.

A proposta do projeto é desenvolver o Hub da Saúde, uma plataforma web que centraliza a divulgação de estudos clínicos por centros de pesquisa e permite que pacientes se cadastrem e acompanhem sua participação nesses estudos.

Essa solução facilita o recrutamento e o gerenciamento de estudos clínicos, promovendo agilidade, transparência e inclusão, além de fortalecer a ponte entre ciência e sociedade.

## Definição do Problema

A realização de estudos clínicos enfrenta diversas dificuldades operacionais e logísticas no Brasil. O recrutamento de pacientes, por exemplo, ainda é realizado de maneira artesanal, com uso de planilhas, contatos diretos e processos manuais, o que gera atrasos e alto custo.

Segundo dados da ClinicalTrials.gov, milhares de estudos clínicos ocorrem simultaneamente no mundo, mas a participação brasileira ainda é limitada, em parte por causa da dificuldade de encontrar voluntários adequados de forma eficiente.

Além disso, pacientes muitas vezes não têm conhecimento da existência desses estudos, nem acesso fácil a informações claras sobre elegibilidade e andamento dos mesmos. Esta lacuna prejudica tanto os pacientes que poderiam se beneficiar de terapias inovadoras quanto os pesquisadores que precisam preencher vagas nos estudos com urgência.

Projetos correlatos, como o próprio ClinicalTrials.gov, são voltados ao público internacional, com interface em inglês e pouca usabilidade para o público brasileiro. Não há, até o momento, uma plataforma brasileira completa voltada à gestão integrada dos estudos clínicos.


## Objetivos

#### Objetivo Geral

Desenvolver uma plataforma web que integre centros de pesquisa e pacientes para facilitar a gestão e a participação em estudos clínicos no Brasil.

#### Objetivos Específicos

- Permitir o cadastro e gerenciamento de perfis para dois tipos de usuários: Pacientes e Centros Clínicos.
- Implementar um sistema de autenticação seguro baseado em tokens (JWT) para proteger as rotas e os dados.
- Desenvolver uma área para Centros Clínicos onde seja possível cadastrar, visualizar, editar e excluir estudos.
- Oferecer uma área para Pacientes onde seja possível buscar estudos compatíveis com seu perfil, inscrever-se e acompanhar suas participações.
- Garantir que a interface seja clara, intuitiva e responsiva para acesso em diferentes dispositivos.
- Viabilizar filtros para facilitar a busca por estudos compatíveis com o perfil do paciente.


## Stack Tecnológico
A seleção das tecnologias foi baseada em critérios de modernidade, performance, segurança e escalabilidade, visando construir uma aplicação robusta e de fácil manutenção.
#
#### Backend
- Node.js com TypeScript: Escolhido pela sua alta performance em operações de I/O (ideais para uma API) e pela segurança de tipos que o TypeScript oferece, reduzindo erros em tempo de desenvolvimento.
- Express.js: Um framework minimalista e flexível para Node.js, utilizado para construir a estrutura da API RESTful de forma rápida e organizada.
- TypeORM: Selecionado como ORM  para abstrair a comunicação com o banco de dados. Sua forte integração com TypeScript e o uso de decorators para definir entidades tornam o código mais limpo e seguro.
- PostgreSQL: Um sistema de gerenciamento de banco de dados relacional de código aberto, conhecido por sua robustez, confiabilidade e suporte a tipos de dados complexos, como arrays, que foram utilizados nos critérios dos estudos.
- JWT (JSON Web Tokens): Utilizado para a implementação do sistema de autenticação, garantindo que as rotas da API sejam seguras e acessíveis apenas por usuários autenticados.


#### Frontend
- Angular: Um framework completo para a construção de aplicações de página única (SPA). Foi escolhido por sua arquitetura robusta baseada em componentes, injeção de dependência, sistema de roteamento poderoso e o uso de TypeScript, que garante consistência com o backend.
- Bootstrap: Framework CSS utilizado para garantir que a aplicação seja totalmente responsiva e para acelerar o desenvolvimento de uma interface limpa e profissiona

### Descrição da solução
O Hub da Saúde é uma plataforma web fullstack projetada para ser o ponto de encontro entre a pesquisa clínica e a população. A solução é dividida em dois portais principais, cada um com funcionalidades específicas para o seu tipo de usuário.

#### Área dos Centros Clínicos:

O portal do centro clínico é uma ferramenta de gerenciamento completa. Após realizar o login, o administrador do centro tem acesso a um dashboard (/centro-home) que lista todos os estudos clínicos associados à sua instituição. A partir desta tela, ele pode:

- Criar Novos Estudos: Através de um formulário dinâmico, o centro pode cadastrar um novo estudo, especificando título, descrição, fase, datas e múltiplos critérios de inclusão e exclusão.
- Visualizar Detalhes: Cada estudo listado pode ser acessado para visualização de seus detalhes completos.
- Editar Estudos: A plataforma permite a edição de todas as informações de um estudo já existente, reutilizando o mesmo formulário de criação para uma experiência consistente.
- Excluir Estudos: É possível excluir estudos, com uma regra de negócio no backend que impede a exclusão caso o estudo já possua pacientes participantes, garantindo a integridade dos dados.
- Ver Participantes: Uma funcionalidade crucial que permite ao centro visualizar uma lista de todos os pacientes inscritos em um determinado estudo, com suas informações de contato e condições médicas

#### Área do Paciente:
O portal do paciente foi projetado para ser simples e empoderador. Após o login, o paciente é direcionado para sua página principal (/home-paciente), onde pode:

- Visualizar Participações: Ver um resumo de todos os estudos em que está atualmente inscrito.

- Editar Perfil: Acessar um formulário para atualizar suas informações pessoais, como nome, endereço e condições médicas.

- Pesquisar Novos Estudos: A funcionalidade principal para o paciente. Ele é levado a uma página que, automaticamente, busca e exibe uma lista de todos os estudos compatíveis com as condições médicas registradas em seu perfil, e nos quais ele ainda não participa.

- Inscrever-se em Estudos: Ao encontrar um estudo de interesse, o paciente pode visualizar seus detalhes e, com um clique, inscrever-se, criando um registro de participação com status "Ativo".

-Sair de um Estudo: Na página de detalhes de um estudo em que participa, o paciente tem a opção de solicitar sua saída, o que remove o seu registro de participação.


### Arquitetura

A solução foi implementada utilizando uma arquitetura desacoplada, com um frontend Angular (SPA) que se comunica com um backend Node.js (API RESTful) através de requisições HTTP. A arquitetura foi guiada por um conjunto de artefatos de design e planejamento para garantir a clareza e a robustez da implementação.

#### Visão geral da Arquitetura

<img width="1152" height="700" alt="Image" src="https://github.com/user-attachments/assets/d0232d8a-9247-46e6-97f2-5728bafd30b7" />

<img width="2375" height="3840" alt="Image" src="https://github.com/user-attachments/assets/ebba2f83-0ed2-453e-ac0e-b0b083fcb65e" />

<img width="1389" height="3840" alt="Image" src="https://github.com/user-attachments/assets/d18ec538-3c87-432b-a0be-ae1ae86045d2" />

#### Camadas do backend
- Controller: Responsável por receber as requisições HTTP, validar os dados de entrada e orquestrar a resposta.
- Service: Contém a lógica de negócio principal da aplicação (ex: impedir inscrição duplicada, verificar se um estudo pode ser excluído).
- Repository (via TypeORM): Camada de abstração para a persistência de dados, responsável por todas as interações com o banco de dados PostgreSQL.

### Artefatos
Durante o ciclo de desenvolvimento, diversos artefatos foram gerados para guiar a implementação e garantir que os requisitos fossem atendidos. Os principais artefatos podem ser encontrados nos repositórios do projeto e incluem:

- Modelo de Entidade-Relacionamento: A estrutura da base de dados foi definida através das entidades do TypeORM (Paciente, CentroClinico, EstudoClinico, ParticipacaoEstudoClinico), que estabelecem as tabelas e suas relações (@ManyToOne, @OneToMany), servindo como um diagrama ER vivo e diretamente ligado ao código.

- Protótipos de Interface (Mockups): O desenvolvimento de telas-chave, como a de "Detalhes do Estudo", foi guiado por protótipos visuais que definiram o layout, a hierarquia da informação e a experiência do usuário desejada, garantindo que a implementação final atendesse às expectativas de design.

- Histórias de Usuário (Funcionalidades): Embora não formalmente documentadas, as funcionalidades implementadas representam as principais histórias de usuário do sistema. Por exemplo: "Como um paciente, eu quero buscar estudos compatíveis com minhas condições para que eu possa encontrar oportunidades de tratamento" ou "Como um centro clínico, eu quero visualizar os participantes de um estudo para gerenciar o recrutamento".

- Documentação da API: A definição e validação dos endpoints da API RESTful foram realizadas com o Postman. A coleção de testes criada serve como uma documentação prática das rotas disponíveis, seus métodos HTTP, os dados esperados no corpo da requisição e os formatos de resposta.

- Processos de Validação: A robustez da aplicação foi validada através de testes manuais contínuos, tanto no frontend quanto no backend, utilizando as Ferramentas de Desenvolvedor do navegador e o Postman para simular fluxos de usuário e garantir que as regras de negócio e de segurança fossem aplicadas corretamente.


## Validação

### Estratégia
A validação da aplicação foi realizada através de um processo contínuo de testes manuais durante o desenvolvimento, focando nos principais fluxos de usuário. Para garantir a robustez da API, foi utilizada a ferramenta Postman para realizar testes de ponta a ponta nos endpoints do backend, verificando:

- Fluxos de Criação (POST): Teste de registo de novos pacientes e centros.
- Fluxos de Autenticação (POST): Teste de login e geração de token JWT.
- Fluxos de Acesso a Dados (GET): Teste de acesso a rotas protegidas com e sem o token de autorização, validando o funcionamento do authMiddleware.
- Fluxos de Atualização (PUT) e Exclusão (DELETE): Teste das funcionalidades de edição e exclusão de entidades.

#### Consolidação dos dados Coletados
Os testes com o Postman foram cruciais para identificar e corrigir problemas de ambiente, configuração de CORS, lógica de autenticação e validações de negócio no backend antes da integração final com o frontend. Os testes de fluxo no frontend validaram a funcionalidade do HttpInterceptor, dos RouteGuards e a reatividade da interface às mudanças de estado, confirmando que os objetivos do projeto foram alcançados.

## Conclusões
O projeto atingiu com sucesso seu objetivo geral de desenvolver uma plataforma web funcional que conecta centros de pesquisa e pacientes. A aplicação final é um MVP (Minimum Viable Product) robusto, que implementa todas as funcionalidades essenciais propostas, como cadastro de usuários, criação e gerenciamento de estudos, e um sistema de busca inteligente para pacientes.
A escolha da stack tecnológica (Angular e Node.js com TypeScript) provou-se acertada, permitindo o desenvolvimento de uma aplicação segura, escalável e de fácil manutenção. A arquitetura de componentes standalone no frontend e a separação de responsabilidades em camadas no backend resultaram em um código limpo e organizado.

### Limitações e Perspectivas Futuras
Como um MVP, o projeto tem limitações que abrem caminho para trabalhos futuros:
- Notificações: Implementar um sistema de notificações para avisar os pacientes sobre novas fases nos estudos em que participam.
- Upload de Documentos: Permitir que centros de pesquisa anexem documentos (como termos de consentimento) aos estudos.

