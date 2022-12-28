#include <iostream>
#include <vector>

#define INPUT(variable) ((std::cerr << #variable << ": "), (std::cin >> variable))

template <typename T>
inline T mod(const T& a, const T& m) {
    return (a % m + m) % m;
}

std::vector<int> get_primes(const int p_max) {
    std::vector<bool> is_prime(p_max + 1, true);
    std::vector<int> primes;
    for (int i = 2; i <= p_max; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
            for (int j = i * 2; j <= p_max; j += i) is_prime[j] = false;
        }
    }
    return primes;
}

int main() {
    int a, b, s, p_max;
    INPUT(a);
    INPUT(b);
    INPUT(s);
    INPUT(p_max);

    for (const int& p : get_primes(p_max)) {
        if (a % p == 0) continue;
        int period, offset = -1;
        uint64_t a_ = mod(a, p), b_ = mod(b, p), s_ = mod(s, p), v = s_;
        for (int i = 0; i <= p; i++) {
            if (i > 0 && v == s_) {
                period = i;
                break;
            }
            if (v == 0) {
                offset = i;
            }
            v = (a_ * v + b_) % p;
        }
        std::cout << p << " " << period << " " << offset << "\n";
    }
    std::cout << std::flush;
}
