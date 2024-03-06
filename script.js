const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");

  fetch("http://www.omdbapi.com/?apikey=6f4a4868&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = ``;

      movies.forEach((m) => {
        cards += `<div class="border border-gray-400 p-2 bg-slate-100">
          <img src="${m.Poster}" alt="" class="object-cover" />
          <div class="flex flex-col gap-1 mt-1">
            <h5 class="font-semibold">${m.Title}</h5>
            <h6>${m.Year}</h6>
            <button class="modal-detail-btn bg-blue-600 p-2 rounded-md text-white max-w-40" data-imdbid="${m.imdbID}">Show Detail</button>
          </div>
        </div>`;
      });

      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      const modalDetailButtons = document.querySelectorAll(".modal-detail-btn");
      modalDetailButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbID = this.getAttribute("data-imdbid");
          fetch("http://www.omdbapi.com/?apikey=6f4a4868&i=" + imdbID)
            .then((response) => response.json())
            .then((data) => {
              const modalContent = `
                 <div class="fixed inset-0 flex items-center justify-center z-50 modal-container" id="movieDetailModal" aria-labelledby="movieDetailModalLabel">
                   <div class="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
                   <div class="bg-white rounded-lg p-8 md:w-[520px] lg:w-[620px] z-10">
                     <div class="flex">
                       <div class="w-1/2 pr-4">
                         <img src="${data.Poster}" alt="Gambar" class="w-full rounded-lg" />
                       </div>
                       <div class="w-1/2">
                         <h2 class="text-xl font-bold mb-2" id="movieDetailModalLabel">${data.Title} (${data.Year})</h2>
                         <ul>
                           <li><span class="font-bold">Director:</span> ${data.Director}</li>
                           <li><span class="font-bold">Writer:</span> ${data.Writer}</li>
                           <li><span class="font-bold">Actors:</span> ${data.Actors}</li>
                           <li><span class="font-bold">Plot:</span> ${data.Plot}</li>
                         </ul>
                         <div class="flex justify-end mt-4">
                           <button class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 modal-close-btn" onclick="closeModal()">Close</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               `;
              document.body.insertAdjacentHTML("beforeend", modalContent);
            });
        });
      });
    });
});

// Fungsi untuk menutup modal
function closeModal() {
  const modal = document.getElementById("movieDetailModal");
  modal.remove(); // Hapus elemen modal dari DOM
}
