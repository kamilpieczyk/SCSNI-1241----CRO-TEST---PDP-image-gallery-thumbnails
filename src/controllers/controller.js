class Controller {
  /**
   @param { String } endpoint
   @returns { Promise<{} | null> }
  **/
  async getRequestHandler(endpoint) {
    try {
      const data = await fetch(endpoint);
      const json = data.json();

      return json;

    } catch (err) {
      console.error(err);

      return null;
    }
  }

  /** 
   * @param { String } selector
   * @returns { Element } element
   */
  getElement(selector, parentNode) {
    let element = null;

    if (parentNode) {
      element = parentNode.querySelector(selector);
    }
    else
      element = document.querySelector(selector);

    return element;
  }

  /**
   * 
   * @param {String} cname 
   * @returns {String} cookie
   */
  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export default Controller;