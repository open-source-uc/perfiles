import React from 'react';

export default function ProjectCards({ elementList }) {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-wrap justify-center">
        {/* recorremos la lista de elementos */}
        {elementList.map((element) => (
          <article className="block m-1 relative p-3 rounded-lg shadow-2xl w-full overflow-hidden bg-gray-500 md:w-1/2 lg:w-1/4">
            <div className="flex justify-between item-center">
              <div className="flex justify-between item-center">
                <h3 className="title-font text-lg my-2 tracking-widest text-blue-800">{element.name.toUpperCase()}</h3>
                {(element.members.length) && (
                  <div className="m-2 pl-1">
                    <span>
                      <i className="fa-solid fa-users" />
                    </span>
                    +
                    {element.members.length}
                  </div>
                )}
              </div>
              {/* //TODO: configurar boton para editar nota si eres el creador o admin */}
              <button className="pr-3" type="button">
                <i className="fa-solid fa-ellipsis-vertical" />
              </button>
            </div>
            <p>{element.description}</p>
            {/* hashtag */}
            {(element.hashtags) && (
              <div className="pt-4">
                {element.hashtags.map((hashtag) => (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                    #
                    {hashtag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
