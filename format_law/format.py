#!/usr/bin/python3

import sys
import re

forms_to_be_deleted = (
   r'ASAMBLEA LEGISLATIVA - REPÚBLICA DE EL SALVADOR\n',
   r'INDICE LEGISLATIVO\n',
   r'_+\n',
   r'(?:\n| +)\d+\n'
)

with open(sys.argv[1]) as law:
   text = law.read()

for form in forms_to_be_deleted:
   text = re.sub(form, '', text)

# Removes only-whitespace lines:

text = re.sub('^\s+(?=\w)|^\s+\n', '', text, flags=re.MULTILINE)

def format_article(match):
   article = match[0]
   # article = article.strip()

   # Adds <p> tags for each paragraph (numbered or not):

   def format_p(match):
      paragraph = match[0]
      # paragraph = paragraph.strip()

      return f'<p>\n{paragraph}\n</p>'

   article = re.sub(
      r'^.+?[:;.)]$',
      format_p,
      article,
      flags=re.MULTILINE | re.DOTALL
   )

   # # Takes the article number to use it below for the <article>'s id:

   article_num = re.search(
      r'(?<=Art. )\d+\.-',
      article
   )[0]

   # Add <strong> tags around 'Art. 1.-' but for all articles:

   article = re.sub(
      r'(Art\. \d+\.-)',
      r'<strong>\1</strong>',
      article
   )

   return f"<article id='art-{article_num}'>\n{article}</article>\n"


# Create an <article> element for each article, with an id corresponding to the article's number.
# For example: The article 1 becomes: <article id='art-1'>Art. 1...</article>

text = re.sub(
   r'Art\..+?(?=Art\. \d+\.-|TÍTULO|CAPÍTULO|SECCIÓN)',
   format_article,
   text,
   flags=re.DOTALL
)

def format_heading(heading):
   # This function returns a function that will return an HTML element of the type specified by 'heading'.
   # For example, in this script 'heading' holds header element names ('h1', 'h2', 'h3', 'h4', 'h5', 'h6').
   # So when 'heading' is 'h2', the returned function below will return an <h2> element.

   def format_h(match):
      title = match[0]
      title = title.strip()
      title = re.sub(r'\n *', r': ', title)

      return f"<{heading}>{title}</{heading}>\n"

   return format_h

# Surrounds any 'TÍTULO' in <h2> tags:

text = re.sub(
   r'(TÍTULO.+?)(?=<|TÍTULO|CAPÍTULO|SECCIÓN)',
   format_heading('h2'),
   text,
   flags=re.DOTALL
)

# Surrounds any 'CAPÍTULO' in <h3> tags:

text = re.sub(
   r'(CAPÍTULO.+?)(?=<|TÍTULO|CAPÍTULO|SECCIÓN)',
   format_heading('h3'),
   text,
   flags=re.DOTALL
)

# Surrounds any 'SECCIÓN' in <h4> tags:

text = re.sub(
   r'(SECCIÓN.+?)(?=<|TÍTULO|CAPÍTULO|SECCIÓN)',
   format_heading('h4'),
   text,
   flags=re.DOTALL
)

print(text)

with open(sys.argv[2], 'w') as output_file:
   output_file.write(text)

print(f'HTML at: {output_file.name}')

