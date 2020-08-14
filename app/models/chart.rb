class Chart < ApplicationRecord
  belongs_to :user
  has_many :memory_objects, dependent: :destroy

end
