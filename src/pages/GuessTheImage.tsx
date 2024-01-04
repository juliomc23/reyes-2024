import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { images } from "../images";
import "./GuessTheImage.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GuessTheImage = () => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [seeForm, setSeeForm] = useState(false);
  const [response, setResponse] = useState("");

  const nextImage = () => {
    if (imageIndex >= images.length - 1) {
      setDisplayForm(true);
      return;
    }

    setImageIndex(imageIndex + 1);
  };

  const previousImage = () => {
    if (imageIndex < 0) {
      return;
    }
    setSeeForm(false);
    setImageIndex(imageIndex - 1);
  };

  const watchImages = () => {
    setDisplayForm(false);
  };

  const setUserResponse = (e: ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
  };

  const checkResponse = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      response === "acampada" ||
      response === "camping" ||
      response === "acampar" ||
      response === "tienda de campaña"
    ) {
      toast.success("Respuesta correcta 😁");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } else {
      toast.error("Respuesta incorrecta 😢");
    }
  };

  useEffect(() => {
    if (imageIndex === 2) {
      setSeeForm(true);
    }
  }, [imageIndex]);

  return (
    <div className="guess-the-image__container">
      <h1>Adivina la imagen</h1>
      <p>Escribe en el campo de texto tu respuesta</p>
      <section className="guess-the-image">
        <section
          className={`${
            !displayForm ? "" : "hidden__image--container"
          } guess-the-image__image-container`}
        >
          <img
            src={`/src/assets/pixelados/${images[imageIndex]}.png`}
            alt="gift"
            className="guess-the-image__image"
          />
          <article className="guess-the-image__buttons">
            <button onClick={previousImage} className="guess-the-image__button">
              Anterior imagen
            </button>
            <button onClick={nextImage} className="guess-the-image__button">
              {seeForm ? "Escribir respuesta" : "Siguiente imagen"}
            </button>
          </article>
        </section>
        <button
          onClick={watchImages}
          type="button"
          className={`${
            displayForm ? "" : "hidden__see-images"
          } see-images__button`}
        >
          Ver imagenes de nuevo
        </button>

        <form
          onSubmit={checkResponse}
          className={`${
            displayForm ? "" : "hidden__form"
          } guess-the-image__form`}
        >
          <input
            type="text"
            onChange={setUserResponse}
            placeholder="Introduce una respuesta"
          />
          <button type="submit">Enviar respuesta</button>
        </form>
      </section>
    </div>
  );
};

export default GuessTheImage;
