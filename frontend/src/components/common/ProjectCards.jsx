import React from 'react';

export default function ProjectCards({ elementList }) {
  return (
    <div className="container px-5 py-10 w-[100%] mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {/* recorremos la lista de elementos */}
        {elementList.map((element) => (
          <article className="block m-1 relative p-3 overflow-y-auto h-[180px] rounded-lg shadow-2xl w-full overflow-hidden bg-osuc-white-3 dark:bg-gray-600">
            <div className="flex flex-col justify-between h-[100%] px-2">
              <div>
                <div className="flex justify-between item-center">
                  <div className="flex justify-between item-center">
                    <h3 className="title-font text-lg my-2 tracking-widest font-semibold uppercase">{element.name}</h3>
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
                {/* description */}
                <p className="leading-6 overflow-hidden line-clamp-3">{element.description}</p>
              </div>
              {/* hashtag */}
              {(element.hashtags) && (
              <div className="pt-4">
                {element.hashtags.map((hashtagsOnProjects) => (
                  <span className="inline-block max-w-[100%] truncate bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                    #
                    {hashtagsOnProjects.hashtag.name}
                  </span>
                ))}
              </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
