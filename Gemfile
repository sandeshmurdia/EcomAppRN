source 'https://rubygems.org'

# Use a concrete Ruby version so RVM/rbenv can select it (>= 2.6.10 required for CocoaPods).
# If you use a different version, change this to match (e.g. "3.2.0").
ruby "2.7.8"

# Exclude problematic versions of cocoapods and activesupport that causes build failures.
gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
gem 'xcodeproj', '< 1.26.0'
gem 'concurrent-ruby', '< 1.3.4'

# Ruby 3.4.0 has removed some libraries from the standard library.
gem 'bigdecimal'
gem 'logger'
gem 'benchmark'
gem 'mutex_m'
