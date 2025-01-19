document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animations
  const div = document.createElement("div");

  div.textContent = `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, quam, autem, natus accusantium cupiditate repudiandae sapiente rem temporibus saepe quia ab est sequi provident minima dolores alias libero! Commodi, quos.
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, quam, autem, natus accusantium cupiditate repudiandae sapiente rem temporibus saepe quia ab est sequi provident minima dolores alias libero! Commodi, quos.
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, quam, autem, natus accusantium cupiditate repudiandae sapiente rem temporibus saepe quia ab est sequi provident minima dolores alias libero! Commodi, quos.`;
  const scrollAnimatorContainer = document.getElementById("scroll-animation");

  if (!scrollAnimatorContainer) return;

  const addDivs = (container, count) => {
    Array.from({ length: count }).forEach((_, index) => {
      const newDiv = div.cloneNode(true);
      newDiv.dataset.index = index; // Assign unique index to each div
      newDiv.classList.add("scroll-item"); // Add a base class for styling or identification
      container.appendChild(newDiv);
    });
  };

  addDivs(scrollAnimatorContainer, 9);

  const animatedElements =
    scrollAnimatorContainer.querySelectorAll(".scroll-item");

  // Intersection Observer callback function
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        // Remove animation class if element is out of view
        entry.target.classList.remove("active-animation");
        return;
      }

      // If the target is intersecting
      entry.target.classList.add("active-animation"); // Add animation class

      // Create a new element for infinite scrolling
      const targetClassIndex = entry.target.dataset.index;
      const newDiv = div.cloneNode(true);
      newDiv.dataset.index = targetClassIndex;
      newDiv.classList.add(`scroll-${targetClassIndex}`, "scroll-item");

      // Append the new element and observe it
      scrollAnimatorContainer.appendChild(newDiv);
      observer.observe(newDiv); // Observe the newly added element
    });
  };

  const animationObserver = new IntersectionObserver(handleIntersection, {
    root: null, // Use the viewport as the root
    threshold: 0.25, // Trigger when 25% of the element is visible
  });

  animatedElements.forEach((el) => animationObserver.observe(el));

  // Lazy Loading Images
  const lazyImages = document.querySelectorAll("img.lazy");
  const lazyImageContainer = document.getElementById("lazy-loading");

  const handleLazyImage = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry, observer);
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Replace placeholder with real image source
        img.classList.remove("lazy"); // Remove the lazy class
        observer.unobserve(img); // Stop observing this image
      }
    });
  };

  const lazyObserver = new IntersectionObserver(handleLazyImage, {
    rootMargin: "-10px", //10px margin was used in the container to address that margin
    root: lazyImageContainer, // Custom container as the root
    threshold: 0.25, // Trigger when 10% of the image is visible in the container
  });

  lazyImages.forEach((img) => lazyObserver.observe(img));
});
