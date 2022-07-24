import React from 'react'

interface propsType {
  onChange: Function
}

export default function CategoryNav({ onChange }: propsType) {
  const menuList = [
    { tableName: 'tb_player', model: 'Player', target: 'tb_team', action: 'hasOne/belongsTo' },
    { tableName: 'tb_team', model: 'Team', target: 'tb_player', action: 'hasMany' },
    { tableName: 'tb_company', model: 'Company', target: 'tb_team', action: 'hasMany' }
  ]

  return (
    <div className="page-nav">
      {/* <strong>Association Action</strong> */}
      <ul>
        {
          menuList.map(menu => (
            <li key={menu.model}>
              <dl>
                <dt>{menu.model}</dt>
                <dd onClick={() => onChange(menu.tableName, menu.target)}>{menu.action}</dd>
                {/* <dd onClick={() => clickHandle(menu.tableName, 'hasMany')}>hasMany</dd>
                <dd onClick={() => clickHandle(menu.tableName, 'many2Many')}>many2Many</dd> */}
              </dl>
            </li>

          ))
        }

      </ul>
    </div>
  )
}
