class Array
  def split_to_uniq(algorithm_next_array: ->(_) { false })
    reduce([]) do |arrays, item|
      candidate_arrays = arrays.reject { |array| array.include?(item) }
      candidate_array = candidate_arrays.find { |array| algorithm_next_array.call(array) } || candidate_arrays[0]
      if (candidate_array.nil?)
        candidate_array = []
        arrays.push(candidate_array)
      end
      candidate_array.push(item)
      arrays
    end
  end
end

DISCOUNTS = {
  0=> 1,
  1=> 1,
  2=> 0.95,
  3=> 0.9,
  4=> 0.8,
  5=> 0.75,
}

def price(books)
  books
    .split_to_uniq(algorithm_next_array: ->(array) { array.size == 3 })
    .map { |uniq_books| uniq_books.count * 8 * DISCOUNTS[uniq_books.count] }
    .sum
end

puts price([1,2,3,4,1,2,4,5]) # Should be 51.2
