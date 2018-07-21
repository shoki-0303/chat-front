class Group < ApplicationRecord
  has_many: group_users
  has_many: user, through: :group_users
  validates :name, presence: true
end
