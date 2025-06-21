# 🎮 PokeAPI - Aplicativo de Pokémons

Um aplicativo web responsivo desenvolvido com **Ionic + Angular** que consome a **PokeAPI** para exibir informações detalhadas sobre Pokémons, incluindo listagem paginada, detalhes completos e interface adaptável para diferentes dispositivos.

## 🛠️ Tecnologias Utilizadas

- **Angular 20** - Framework principal com componentes standalone
- **Ionic Framework** - UI components e responsividade
- **TypeScript** - Tipagem estática e melhor DX
- **SCSS** - Estilos avançados com variáveis CSS
- **RxJS** - Programação reativa para requisições HTTP
- **PokeAPI** - API REST para dados dos Pokémons

## 🚀 Como Instalar e Rodar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/AlexCorreaDJ/PokeAPI.git
   cd PokeAPI
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o projeto:**
   ```bash
   ng serve --port=8100
   ```

4. **Acesse:** http://localhost:8100/

## 📱 Como Funciona

### Listagem de Pokémons
A tela principal exibe uma grade responsiva de Pokémons com nome, ID e sprite, organizada em 2-6 colunas dependendo do tamanho da tela, consumindo dados da PokeAPI através do `PokemonService`.

### Detalhes Completos
Ao clicar em um Pokémon, você é redirecionado para uma página de detalhes que exibe informações completas como altura, peso, tipos, habilidades, estatísticas e imagens (normal/shiny), organizadas em cards responsivos.

### Paginação Inteligente
O sistema de paginação permite navegar entre 20 Pokémons por página usando botões "Anterior" e "Próximo", com controle automático de estado (botão anterior desabilitado na primeira página) e informações visuais da página atual.

## ⭐ Funcionalidades de Favoritos

O projeto está preparado para implementação de favoritos com `@ionic/storage-angular` instalado, permitindo salvar Pokémons favoritos localmente no dispositivo do usuário.

## 📐 Boas Práticas Implementadas

### Arquitetura e Serviços
- **Separação de responsabilidades** com `PokemonService` para lógica de negócio
- **Injeção de dependência** para HttpClient e Router
- **Interfaces TypeScript** para tipagem forte dos dados da API
- **Componentes standalone** para melhor modularidade

### Responsividade e UX
- **Grid system dinâmico** com breakpoints específicos para mobile, tablet e desktop
- **Orientação adaptativa** para modo retrato e paisagem
- **Tipografia escalável** com fontes otimizadas para cada dispositivo
- **Estados de loading e erro** para melhor experiência do usuário

## 🔧 Estrutura do Projeto

```
src/app/
├── pages/
│   ├── home/           # Listagem principal
│   └── details/        # Detalhes do Pokémon
├── services/
│   └── pokemon.service.ts  # Lógica de API
├── app.routes.ts       # Configuração de rotas
└── app.config.ts       # Configuração da aplicação
```

## 📊 Características Técnicas

- **SSR/Prerendering** configurado (com limitações para rotas dinâmicas)
- **Lazy loading** de componentes Ionic
- **Error handling** robusto para falhas de API
- **Performance otimizada** com imagens responsivas
- **Acessibilidade** com alt texts e navegação por teclado

---

**Desenvolvido com ❤️ usando Ionic + Angular**
