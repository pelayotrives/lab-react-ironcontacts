import contacts from "../contacts.json";
import { useState } from "react";

function Contacts() {
  // Usamos estados ya que vamos a alterar una información.
  //! Nuestro estado inicial queramos que sean los 3 magos iniciales.
  //! const [miEstado, funcionQueModificaMiEstado] = useState(valorInicial)

  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));

  // TODO -----> Función para añadir contactos
  const addContact = () => {
      console.log("Adding random contact.");
      //! 1. Agregamos un contacto random
      //* Hacemos un random y lo redondeamos con floor
      const randomNumber = Math.floor(Math.random() * contacts.length)
      const randomContact = contacts[randomNumber]

      //* Hacemos copia del array con spread
      const contactsListCopy = [...contactsList]
      //* Pusheamos a nuestra copia del array un contacto random
      contactsListCopy.push(randomContact)
      //! 2. Actualizamos el estado con nuestro array copia.
      setContactsList(contactsListCopy)
  }

  // TODO -----> Función para ordenar por popularidad
  const sortPopularity = () => {
      console.log("Sorting by popularity.");
      //! 1. Copiamos array ya que sort modifica el original
      const contactsListCopy = [...contactsList]
      //! 2. Ordenamos
      contactsListCopy.sort( (eachContact1, eachContact2) => eachContact1.popularity < eachContact2.popularity ? 1 : -1)
      //! 3. Actualizamos el estado
      setContactsList(contactsListCopy)

  }

  // TODO -----> Función para ordenar por nombre
  const sortName = () => {
      console.log("Sorting by name.");
      //! 1. Copiamos array ya que sort modifica el original
      const contactsListCopy = [...contactsList]
      //! 2. Ordenamos
      contactsListCopy.sort( (eachContact1, eachContact2) => eachContact1.name > eachContact2.name ? 1 : -1)
      //! 3. Actualizamos el estado
      setContactsList(contactsListCopy)
  }

  // TODO -----> Función para borrar contacto
  // Le pasamos como event el ID para borrar
  const deleteContact = (idToDelete) => {
    // Lo pasamos por el log para ver cuál es.
    console.log("Deleting ---> ", idToDelete);
    //! 1. Buscamos un elemento por su ID mediante filter
    const filterArr = contactsList.filter( eachContact => eachContact.id === idToDelete ? false : true)
    //! 2. Actualizamos el estado
    setContactsList(filterArr)
  }

  return (
    <div>
      <h1>IronContacts</h1>

      <header>

      <button onClick={addContact}>Add random contact</button> <span>  </span>
      <button onClick={sortPopularity}>Sort by popularity</button> <span>  </span>
      <button onClick={sortName}>Sort by name</button> <span> </span>

      </header>

      <table>
        <tbody>
            <tr>
                <td width="200px"><h2>Picture</h2></td>
                <td width="200px"><h2>Name</h2></td>
                <td width="200px"><h2>Popularity</h2></td>
                <td width="200px"><h2>Won an Oscar</h2></td>
                <td width="200px"><h2>Won an Emmy</h2></td>
                <td width="200px"><h2>Actions</h2></td>
            </tr>
        </tbody>
      </table>

      {
        contactsList.map((element) => {
        return (

          <table>

            <tbody>

              <tr key={element.id}>
                <td width="200px"> <img src={element.pictureUrl} alt="Actor or actress" width="150px"/> </td>
                <td width="200px">{element.name}</td>
                <td width="200px">{element.popularity.toFixed(2)}</td>
                <td width="200px">{element.wonOscar ? "✅" : "❌" }</td>
                <td width="200px">{element.wonEmmy ? "✅" : "❌" }</td>
                {/* En el onClick, pasamos una función anónima con recursión y con argumento el id de cada elemento. */}
                <td width="200px"> <button onClick={() => deleteContact(element.id)}>Delete</button> </td>
              </tr>

            </tbody>

          </table>

        )
        
      })
      
      }

    </div>
  );
}

export default Contacts;
