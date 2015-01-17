
# Usage:
#   $ rake dev:タスク名
#     ex) $ rake dev:generate

namespace :dev do
  desc 'tasks for development'

  task :init => :environment do
    Post.delete_all
    posts = [
      { name: "山田一郎", public: false, age: 18, address:"東京", scale: 1 },
      { name: "田中二郎", public: true, age: 20, address:"大阪", scale: 2 },
      { name: "佐藤三郎", public: true, age: 22, address:"北海道", scale: 3 },
    ]

    posts.each do |h|
      p Post.create!(h) 
    end
  end
end
