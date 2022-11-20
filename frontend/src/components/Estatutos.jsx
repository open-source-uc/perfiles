import React from 'react';
import { Helmet } from 'react-helmet';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import remarkGfm from 'remark-gfm';

export default function Inscripciones() {
  const [statutes, setStatutes] = React.useState('');

  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/open-source-uc/meta/main/Estatuto_OSUC.md').then(
      (response) => {
        response.text().then((text) => {
          setStatutes(text);
        });
      },
    );
  }, []);

  return (
    <section className="styleword prose dark:prose-invert">
      <Helmet>
        <title>Estatutos | Members OSUC</title>
      </Helmet>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {statutes}
      </ReactMarkdown>
    </section>
  );
}
