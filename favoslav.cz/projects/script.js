const accessToken = "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";
const username = 'mrFavoslav';

// Fetch user repositories
fetch(`https://api.github.com/users/${username}/repos`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(repositories => {
    const section = document.getElementById('section1'); // Get the section element by ID
    const loading = document.getElementById('loading');

    repositories.forEach(repository => {
      // Create a new div element for each repository
      const sec1 = document.createElement('section');
      sec1.className = 'flex flex-col bg-[rgb(19,19,19)] border-[1px] border-neutral-800 md:w-96 min-h-max p-6 rounded-md w-80 text-white';
      sec1.id = repository.name;

        const div1 = document.createElement('div');
        div1.className = 'flex flex-col pb-4';

          const h2_1 = document.createElement('h2');
          h2_1.className = 'break-words font-bold mb-4 text-2xl'
          h2_1.textContent = repository.name;

          const div2 = document.createElement('div');
          div2.className = 'flex'

            const div3 = document.createElement('div');
            div3.className = 'flex items-center px-4 bg-neutral-800 gap-2 h-fit justify-center py-1 rounded-lg text-neutral-300 translate-y-1'

              const div4 = document.createElement('div');
              div4.className = 'flex gap-1'
                const img1 = document.createElement('img');
                img1.className = 'h-[21px] translate-y-[1px] w-[21px]'
                img1.src = './icons/star.svg'
                const p2 = document.createElement('p');
                p2.textContent = repository.stargazers_count;

              const div5 = document.createElement('div');
              div5.className = 'flex gap-1'
                const img2 = document.createElement('img');
                img2.className = 'h-[21px] translate-y-[1px] w-[21px]'
                img2.src = './icons/code_fork.svg'
                const p3 = document.createElement('p');
                p3.textContent = repository.forks_count;

        const p1 = document.createElement('p');
        p1.className = 'text-neutral-300 break-all mb-6'
        p1.textContent = repository.description;

        const div6 = document.createElement('div');
        div6.className = 'mt-auto'
          const a1 = document.createElement('a');
          a1.className = 'text-neutral-300 bg-neutral-800 [&_img]:hover:translate-x-[3px] [&_img]:transition-all bottom-0 duration-100 false hover:bg-neutral-700 inline-flex px-6 py-2 rounded-md transition-colors w-fit'
          a1.textContent = 'GitHub'
          a1.href = repository.html_url
            const img3 = document.createElement('img');
            img3.className = 'w-5 h-[23px] ml-2 mt-[1px]'
            img3.src = './icons/arrow_up_right.svg'
          
          const a2 = document.createElement('a');
          a2.className = 'text-neutral-300 bottom-0 duration-100 false inline-flex px-6 py-2 w-fit hover:translate-y-[-4px] hover:text-neutral-200 transition-all'
          a2.textContent = 'Docs'
          a2.href = '/docs'
            const img4 = document.createElement('img');
            img4.className = 'w-5 h-[23px] ml-2 mt-[1px]'
            img4.src = './icons/open_book.svg'

      // Build the hierarchy
      a1.appendChild(img3);
      a2.appendChild(img4);

      div6.appendChild(a1);
      div6.appendChild(a2);
      
      div5.appendChild(img2);
      div5.appendChild(p3);

      div4.appendChild(img1);
      div4.appendChild(p2);

      div3.appendChild(div4);
      div3.appendChild(div5);

      div2.appendChild(div3);

      div1.appendChild(h2_1);
      div1.appendChild(div2);

      sec1.appendChild(div1);
      sec1.appendChild(p1);
      sec1.appendChild(div6);

      section.appendChild(sec1);
    });
    console.log("[www.favoslav.cz] Projects fetched sucesfully.")
    section.classList.remove("hidden");
    loading.classList.add("hidden");
    section.classList.add("flex");
  })
  .catch(error => console.error('Error fetching repositories:', error));