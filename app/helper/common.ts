export class common{
  /**
   * Change to opposite value of a flag
   * @param flag the flag that need handle
   * @returns a opposite value of param
   */
  static handleFlag(flag) : boolean {
    if(flag) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Shuffle a array ramdomly
   * @param array 
   * @returns shuffled array
   */
  static shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}

