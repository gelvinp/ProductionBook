class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents, id: false do |t|
      t.string :name
      t.uuid :uuid
      t.references :section

      t.timestamps
    end

    execute "ALTER TABLE documents ADD PRIMARY KEY (uuid);"
  end
end
