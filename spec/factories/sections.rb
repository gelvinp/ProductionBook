FactoryBot.define do
  factory :section do
    name { "Test Section" }
  end

  factory :otherSection, class: "Section" do
    name { "Other Section" }
  end
end
