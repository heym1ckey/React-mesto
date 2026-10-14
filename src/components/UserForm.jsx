import { use } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserForm({
  title,
  name,
  loadingButtonTitle,
  buttonTitle,
  onSubmit,
  children,
  showLink = false,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const [name, setName] = useState(currentUser?.name ?? "");
  //   const [email, setEmail] = useState(currentUser?.email ?? "");

  //   useEffect(() => {
  //     if (currentUser) {
  //       setName(currentUser.name || "");
  //       setDescription(currentUser.about || "");
  //     }
  //   }, [currentUser]);

  //   function handleNameChange(e) {
  //     setName(e.target.value);
  //   }

  //   function handleDescriptionChange(e) {
  //     setDescription(e.target.value);
  //   }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   return onUpdateUser({
  //     name: name,
  //     about: description,
  //   });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="userform">
        <form className={`userform__container`} name={name} onSubmit={handleSubmit} action="">
          <h2 className="userform__header">{title}</h2>
          {children}
          <div className="userform__footer">
            <button className="userform__button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? loadingButtonTitle || `${buttonTitle}...` : buttonTitle}
            </button>
            {showLink && (
              <Link to="/sign-in" className="userform__link">
                Уже зарегистрированы? Войти
              </Link>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
