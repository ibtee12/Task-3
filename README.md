

### 1. getElementById vs getElementsByClassName vs querySelector / querySelectorAll

- getElementById("id") → finds one element by its id
- getElementsByClassName("class") → finds all elements with that class (returns a list)
- querySelector(".class") → finds the first match using CSS selector
- querySelectorAll(".class") → finds all matches using CSS selector

### 2. How to create and insert a new element into the DOM?


var newDiv = document.createElement("div");  
newDiv.innerHTML = "Hello!";                 
document.getElementById("container").appendChild(newDiv); 

### 3. What is Event Bubbling?

If we click an element, the click event travels up to its parent, then grandparent, and so on. So if we click a button inside a div, the div also gets the click event.

### 4. What is Event Delegation?

Instead of adding event listeners to every child element, we add one listener to the parent and use event.



### 5. preventDefault() vs stopPropagation()

- preventDefault() → stops the browser's default action (like a link navigating to a new page)
- stopPropagation() → stops the event from bubbling up to parent elements


