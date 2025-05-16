# Hub da Saúde 
_Lauro Fraga_
\ _Projeto Desenvolvimento II - Análise e Desenvolvimento de Sistemas_
\ _Centro Universitário Senac-RS_

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

-  Permitir o cadastro e gerenciamento de estudos clínicos por centros de pesquisa.
- Oferecer uma área do paciente para inscrição, acompanhamento e histórico de participação.
- Implementar controle de fases dos estudos, com visualização clara do progresso.

- Viabilizar filtros para facilitar a busca por estudos compatíveis com o perfil do paciente.


## Stack Tecnológico

#### Backend
- Node.js com TypeScrip
- Express
- TypeORM
- PostgreSQL

#### Frontend
- Angular

### Descrição da solução

#### Área dos Centros Clínicos:

- Cadastro de novos estudos clínicos.

- Acompanhamento das fases dos estudos.

- Associação de pacientes aos estudos.

- Atualização de status e registro de observações.

#### Área do Paciente:

- Cadastro e login seguro.

- Busca por estudos com base em critérios personalizados.

- Inscrição nos estudos.

- Acompanhamento das fases e notificações de mudanças.

### Arquitetura

A solução será implementada utilizando a arquitetura MVC (Model-View-Controller) e segue o padrão RESTful na API.

#### Camadas
- Model: Representa as entidades do sistema 
- Controller: Regras de negócio e endpoints.
- Service: Lógica intermediária e validações.
- Repository (via TypeORM): Persistência de dados.

## Validação

## Conclusões
