# import math


# def is_prime(x):
#   for i in range(2 , int(math.sqrt(x)) // 1):
#     if x % i ==0:
#       print("no")


# is_prime(77)


def overlap( xs , ys ):
  A_list =[]
  set_xs = set(xs)
  set_ys = set(ys)

  return list(set_xs & set_ys)

print(overlap([1,2,3,4,5], [2,3,5,7,11]))
