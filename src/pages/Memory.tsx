import { useEffect, useRef, useState } from "react";
import "./Memory.css";
import { useNavigate } from "react-router-dom";

interface Card {
  id: number;
  isFlipped: boolean;
  cardEmoji: string;
  pairId: number;
}

const Memory = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      isFlipped: false,
      cardEmoji: "🌅",
      pairId: 5,
    },
    {
      id: 2,
      isFlipped: false,
      cardEmoji: "🌲",
      pairId: 6,
    },
    {
      id: 3,
      isFlipped: false,
      cardEmoji: "🌑",
      pairId: 8,
    },
    {
      id: 4,
      isFlipped: false,
      cardEmoji: "👩‍❤️‍👨",
      pairId: 7,
    },
    {
      id: 5,
      isFlipped: false,
      cardEmoji: "🌅",
      pairId: 1,
    },
    {
      id: 6,
      isFlipped: false,
      cardEmoji: "🌲",
      pairId: 2,
    },
    {
      id: 7,
      isFlipped: false,
      cardEmoji: "👩‍❤️‍👨",
      pairId: 4,
    },
    {
      id: 8,
      isFlipped: false,
      cardEmoji: "🌑",
      pairId: 3,
    },
  ]);
  const initialCardsRef = useRef(cards);

  function shuffle(array: Card[]) {
    let currentIndex = array.length,
      randomIndex;

    // Mientras queden elementos a mezclar...
    while (currentIndex !== 0) {
      // Seleccionar un elemento restante...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // E intercambiarlo con el elemento actual.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const guessTheCard = (clickedCard: Card) => {
    if (clickedCard.isFlipped) {
      // Si la carta ya está volteada, no hacer nada.
      return;
    }

    const newCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (selectedCard) {
      if (clickedCard.pairId === selectedCard.id) {
        // Las cartas coinciden, reinicia la carta seleccionada
        setSelectedCard(null);
      } else {
        // Las cartas no coinciden, cierra ambas después de un breve retraso
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              [clickedCard.id, selectedCard.id].includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
        setSelectedCard(null);
      }
    } else {
      // No hay carta seleccionada previamente, establece la carta clickeada como seleccionada
      setSelectedCard(clickedCard);
    }
  };

  useEffect(() => {
    const shuffledCards = shuffle([...initialCardsRef.current]);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    const allCardsFlipped = cards.every((card) => card.isFlipped);
    if (allCardsFlipped) {
      navigate("/home");
    }
  }, [cards, navigate]);

  return (
    <div className="memory">
      <h1>Juego de memoria</h1>
      <span>Elige bien las cartas y forma parejas para ganar</span>
      <section className="memory__grid">
        {cards.map((card) => (
          <button
            className={`memory__card ${
              card.isFlipped ? "flipped" : "not_flipped"
            }`}
            onClick={() => guessTheCard(card)}
            key={card.id}
          >
            {card.isFlipped ? card.cardEmoji : "🥰"}
          </button>
        ))}
      </section>
    </div>
  );
};

export default Memory;
