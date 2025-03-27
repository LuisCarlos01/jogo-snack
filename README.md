# Jogo Snake
Um jogo clássico da cobra (Snake) com um visual moderno e neon

## Contexto
Este é um jogo moderno de Snake onde o jogador controla uma cobra que deve comer frutas para crescer. A cobra pode atravessar as paredes, aparecendo do outro lado da tela. O único modo de game over é colidir com o próprio corpo.

## Características
- Visual moderno com estilo neon
- A cobra pode atravessar as paredes
- Efeitos visuais suaves
- Sistema de pontuação
- Efeitos sonoros

## Titular
Luis Carlos

## Detalhes
- **Plataforma:** Web
- **Tecnologias Utilizadas:** HTML, CSS, JavaScript
- **Como Jogar:** Use as setas do teclado para mover a cobra
- **Objetivo:** Comer o máximo de frutas possível sem colidir com o próprio corpo

## Instruções de Instalação
1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador

## Alterações Realizadas

### 1. Efeitos Sonoros
- **Adição de Efeitos Sonoros**: Foram adicionados efeitos sonoros para melhorar a experiência do jogador.
  - `eat.mp3`: Som que toca quando a cobra come uma fruta.
  - `gameover.mp3`: Som que toca quando o jogo termina.
- **Implementação**: Os efeitos sonoros foram implementados no arquivo `js/script.js` usando a classe `Audio`.

### 2. Lógica de Colisão
- **Colisão com Paredes**: A lógica de colisão com as paredes foi removida, permitindo que a cobra atravesse as paredes e apareça do outro lado da tela.
- **Colisão com o Próprio Corpo**: O único modo de game over agora é colidir com o próprio corpo da cobra.

### 3. Estilização do Canvas
- **Borda e Sombra**: O canvas agora possui uma borda verde, bordas arredondadas e uma sombra verde para um efeito mais atraente.

### 4. Efeitos de Transição
- **Transições Suaves**: Foram adicionadas transições suaves para o fundo do corpo e para o botão, melhorando a experiência visual.

### 5. Estilização do Menu
- **Menu Elegante**: O menu agora tem um fundo semi-transparente, bordas arredondadas e uma sombra, tornando-o mais elegante.

### 6. Efeitos de Texto
- **Sombra e Cor Vibrante**: Adicionadas sombras ao texto da pontuação e uma cor vibrante para o texto "Game Over".

### 7. Sistema de Boost
- **Aumento de Velocidade**: Implementado um sistema de boost que aumenta a velocidade da cobra quando o jogador segura as teclas de direção.
- **Visual do Boost**: A cor da cobra muda durante o boost para indicar visualmente que a velocidade foi aumentada.

## Contribuições
Sinta-se à vontade para contribuir com melhorias ou correções!
