FactoryBot.define do
  factory :section do
    name { "Unclassified" }
  end

  factory :otherSection, class: "Section" do
    name { "Other Section" }
  end
end
