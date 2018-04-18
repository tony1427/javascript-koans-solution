var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(product){
        return !product.containsNuts
      }).filter(function (product) {
        return product.ingredients.indexOf("mushrooms") === -1
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _.range(1000).reduce(function (total, num){
      if(num % 3 === 0 || num % 5 === 0){
        return total += num;
      }

      return total;
    });

    /*
      Chaining = Calling chain will cause all future method calls to return wrapped objects.
      When you've finished the computation, call value to retrieve the final value.
      Here's an example of chaining together a map/flatten/reduce, in order to get the word count of every word in a song.
      | var lyrics = [
      | {line: 1, words: "I'm a lumberjack and I'm okay"},
      | {line: 2, words: "I sleep all night and I work all day"},
      | {line: 3, words: "He's a lumberjack and he's okay"},
      | {line: 4, words: "He sleeps all night and he works all day"}
      | ];
      |
      | _.chain(lyrics)
      | .map(function(line) { return line.words.split(' '); })
      | .flatten()
      | .reduce(function(counts, word) {
      | counts[word] = (counts[word] || 0) + 1;
      | return counts;
      | }, {})
      | .value();
      |
      | => {lumberjack: 2, all: 4, night: 2 ... }


       _range = _.range([start], stop, [step])
       A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1.
       Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step, exclusive.
       Note that ranges that stop before they start are considered to be zero-length instead of negative — if you'd like a negative range, use a negative step.
       | _.range(10);
       | => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
       | _.range(1, 11);
       | => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       | _.range(0, 30, 5);
       | => [0, 5, 10, 15, 20, 25]
       | _.range(0, -10, -1);
       | => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
       | _.range(0);
       | => []
     */
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
      ingredientCount = _(products).chain()
                        //need to create an array of ingredients
                        .map(function(product) {return product.ingredients;})
                        .flatten()
                        .reduce(function (array, ingredient)
                                { array[ingredient] = (array[ingredient] || 0) + 1;
                                return array }, ingredientCount)
                                .value();

    /*
     * http://underscorejs.org/
         _map = _.map(list, iteratee, [context])
          Produces a new array of values by mapping each value in list through a transformation function (iteratee).
          The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
          _.map([1, 2, 3], function(num){ return num * 3; });
          | => [3, 6, 9]
          | _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
          | => [3, 6, 9]
          | _.map([[1, 2], [3, 4]], _.first);
          | => [1, 3]

        _reduce = _.reduce(list, iteratee, [memo], [context])
          Also known as inject and foldl, reduce boils down a list of values into a single value.
          Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee.
          The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.

          If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list.
          The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.
          | var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
          | => 6

        _flatten = _.flatten(array, [shallow])
          Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
          | _.flatten([1, [2], [3, [[4]]]]);
          | => [1, 2, 3, 4];
          |
          | _.flatten([1, [2], [3, [[4]]]], true);
          | => [1, 2, 3, [[4]]];

        _chain = _.chain(obj)
          Returns a wrapped object. Calling methods on this object will continue to return wrapped objects until value is called.
          | var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
          | var youngest = _.chain(stooges)
          | .sortBy(function(stooge){ return stooge.age; })
          | .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
          | .first()
          | .value();
          | => "moe is 21"

        _value = _.chain(obj).value()
          Extracts the value of a wrapped object.

          | _.chain([1, 2, 3]).reverse().value();
          | => [3, 2, 1]
     */


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
