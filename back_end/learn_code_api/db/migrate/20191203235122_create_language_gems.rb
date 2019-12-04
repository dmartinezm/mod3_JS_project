class CreateLanguageGems < ActiveRecord::Migration[6.0]
  def change
    create_table :language_gems do |t|
      t.string :name
      t.string :image
      t.integer :value

      t.timestamps
    end
  end
end
